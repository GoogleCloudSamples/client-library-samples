// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

// [START storage_v2_storage_bucket_get]

import (
	"context"
	"fmt"
	"io"

	"cloud.google.com/go/storage"
)

// getBucket retrieves metadata for a Google Cloud Storage bucket.
func getBucket(ctx context.Context, w io.Writer, projectID string, bucketID string) error {
	name := fmt.Sprintf("projects/%s/buckets/%s", projectID, bucketID)

	client, err := storage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("storage.NewClient: %w", err)
	}
	defer client.Close()

	attrs, err := client.Bucket(bucketID).Attrs(ctx)
	if err != nil {
		return fmt.Errorf("Bucket(%q).Attrs: %w", bucketID, err)
	}

	fmt.Fprintf(w, "Retrieved bucket: %s\n", name)
	fmt.Fprintf(w, "Location: %s\n", attrs.Location)
	fmt.Fprintf(w, "Storage class: %s\n", attrs.StorageClass)

	return nil
}

// [END storage_v2_storage_bucket_get]
