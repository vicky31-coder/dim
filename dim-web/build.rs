use std::env;
use std::error::Error;
use std::fs;
use std::path::Path;
use std::process::Command;
use std::str::FromStr;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let out_dir = env::var("OUT_DIR").unwrap();

    let db_file = format!("{out_dir}/dim_dev.db");
    println!("cargo:rustc-env=DATABASE_URL=sqlite://{db_file}");

    if !Path::new(&db_file).exists() {
        let pool = sqlx::sqlite::SqlitePoolOptions::new()
            .connect_with(
                sqlx::sqlite::SqliteConnectOptions::from_str(db_file.as_ref())?
                    .create_if_missing(true),
            )
            .await?;

        // Point to dim-database migrations
        let migrations = Path::new("../dim-database/migrations");

        // We actully need to run migrations for sqlx macros to work
        sqlx::migrate::Migrator::new(migrations)
            .await?
            .run(&pool)
            .await
            .map_err(|e| {
                println!("cargo:warning=Migration failed: {:?}", e);
                e
            })?;
    }

    let git_tag_output = Command::new("git")
        .args(&["describe", "--abbrev=0"])
        .output()
        .unwrap();
    let git_tag = String::from_utf8(git_tag_output.stdout).unwrap();
    println!("cargo:rustc-env=GIT_TAG={}", git_tag);

    let git_sha_256_output = Command::new("git")
        .args(&["rev-parse", "HEAD"])
        .output()
        .unwrap();
    let git_sha_256 = String::from_utf8(git_sha_256_output.stdout).unwrap();
    println!("cargo:rustc-env=GIT_SHA_256={}", git_sha_256);

    if Path::new("../ui/build").exists() {
        println!("cargo:rustc-cfg=feature=\"embed_ui\"");
    } else {
        println!("cargo:warning=`ui/build` does not exist.");
        println!("cargo:warning=If you wish to embed the webui, run `yarn build` in `ui`.");
    }

    println!("cargo:rerun-if-changed=ui/build");
    println!("cargo:rerun-if-changed=build.rs");
    println!("cargo:rerun-if-changed=../dim-database/migrations");

    Ok(())
}
