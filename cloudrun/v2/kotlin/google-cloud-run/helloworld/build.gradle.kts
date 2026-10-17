plugins {
  id("org.springframework.boot") version "3.3.5"
  id("io.spring.dependency-management") version "1.1.6"
  kotlin("jvm") version "2.0.21"
  kotlin("plugin.spring") version "2.0.21"
}

repositories {
  mavenCentral()
}

dependencies {
  implementation("org.springframework.boot:spring-boot-starter-webflux")
  implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
  implementation("org.jetbrains.kotlin:kotlin-reflect")

  testImplementation("org.springframework.boot:spring-boot-starter-test")
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
    resources {
      setSrcDirs(listOf("."))
      include("application.properties")
    }
  }
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
