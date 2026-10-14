plugins {
  kotlin("jvm") version "2.0.21"
  application
}

repositories {
  mavenCentral()
}

dependencies {
  implementation(platform("com.google.cloud:libraries-bom:26.50.0"))
  implementation("com.google.cloud:google-cloud-firestore")

  testImplementation(kotlin("test"))
  testImplementation("com.google.truth:truth:1.4.4")
}

sourceSets {
  main {
    kotlin {
      setSrcDirs(listOf("."))
      include("*.kt")
      exclude("build.gradle.kts")
    }
  }
}

application {
  mainClass.set(providers.gradleProperty("mainClass").orElse("SetDocumentKt"))
}

tasks.test {
  useJUnitPlatform()
  testLogging {
    events("passed", "skipped", "failed", "standardOut", "standardError")
    showStandardStreams = true
    exceptionFormat = org.gradle.api.tasks.testing.logging.TestExceptionFormat.FULL
  }
}

kotlin {
  jvmToolchain(21)
}
