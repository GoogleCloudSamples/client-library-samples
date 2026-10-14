variable "project_id" {
  description = "Google Cloud Project ID"
  type        = string
}

resource "random_id" "default" {
  byte_length = 2
}

resource "google_project_service" "firestore" {
  project            = var.project_id
  service            = "firestore.googleapis.com"
  disable_on_destroy = false
}

resource "google_firestore_database" "default" {
  project                 = google_project_service.firestore.project
  name                    = "(default)"
  location_id             = "nam5"
  type                    = "FIRESTORE_NATIVE"
  delete_protection_state = "DELETE_PROTECTION_DISABLED"
  deletion_policy         = "DELETE"
}

resource "google_firestore_document" "default" {
  project     = google_firestore_database.default.project
  database    = google_firestore_database.default.name
  collection  = "example-collection-${random_id.default.hex}"
  document_id = "example-document-${random_id.default.hex}"
  fields      = "{\"environment\":{\"stringValue\":\"production\"}}"
}

output "collection_id" {
  description = "Firestore collection identifier"
  value       = google_firestore_document.default.collection
}
