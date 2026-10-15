// [START cloudrun_helloworld_service]
// [START run_helloworld_service]
package demo

import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

/**
 * Minimal Spring Boot HTTP service for Google Cloud Run that responds to GET
 * requests on "/" using the NAME environment variable.
 */
@SpringBootApplication
@RestController
class DemoApplication(
  @Value("\${NAME:World}") private val name: String,
) {
  @GetMapping("/")
  fun index(): String = "Hello $name!"
}

fun main(args: Array<String>) {
  runApplication<DemoApplication>(*args)
}
// [END run_helloworld_service]
// [END cloudrun_helloworld_service]
