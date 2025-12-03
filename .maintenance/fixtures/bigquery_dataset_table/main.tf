# This fixture creates a BigQuery Dataset and Table within that dataset.

variable "project_id" {
  description = "Google Cloud Project ID"
}

resource "random_id" "default" {
  byte_length = 2
}

resource "google_bigquery_dataset" "default" {
  project     = var.project_id
  dataset_id  = "my_dataset_${random_id.default.hex}"
  description = "CI Dataset Fixture"
  location    = "us-central1"

}

resource "google_bigquery_table" "default" {
  project             = var.project_id
  dataset_id          = google_bigquery_dataset.default.dataset_id
  table_id            = "my_table_${random_id.default.hex}"
  deletion_protection = false

  schema = <<EOF
[
  {
    "name": "field_01",
    "type": "STRING"
  },
  {
    "name": "field_02",
    "type": "STRING"
  },
  {
    "name": "field_03",
    "type": "INTEGER"
  }
]
EOF

}

output "dataset_id" {
  value = google_bigquery_dataset.default.dataset_id
}

output "table_id" {
  value = google_bigquery_table.default.table_id

}
