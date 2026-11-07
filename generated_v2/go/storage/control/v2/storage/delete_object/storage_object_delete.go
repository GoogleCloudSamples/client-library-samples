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

// [START storage_v2_storage_object_delete]

import (
	"context"
	"fmt"
	"io"

	"cloud.google.com/go/storage"
)

// deleteObject deletes an object from a Cloud Storage bucket.
func deleteObject(ctx context.Context, w io.Writer, projectID string, bucketID string, object string) error {
	bucket := fmt.Sprintf("projects/%s/buckets/%s", projectID, bucketID)
	_ = bucket

	client, err := storage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("storage.NewClient: %w", err)
	}
	defer client.Close()

	if err := client.Bucket(bucketID).Object(object).Delete(ctx); err != nil {
		return fmt.Errorf("Object(%q).Delete: %w", object, err)
	}

	fmt.Fprintf(w, "Deleted object %s\n", object)

	return nil
}

// [END storage_v2_storage_object_delete]
