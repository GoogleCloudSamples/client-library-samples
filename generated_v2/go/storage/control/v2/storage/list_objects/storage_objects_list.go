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

// [START storage_v2_storage_objects_list]

import (
	"context"
	"fmt"
	"io"

	"cloud.google.com/go/storage"
	"google.golang.org/api/iterator"
)

// listObjects lists objects in the specified Cloud Storage bucket.
func listObjects(ctx context.Context, w io.Writer, projectID string, bucketID string) error {
	parent := fmt.Sprintf("projects/%s/buckets/%s", projectID, bucketID)
	_ = parent

	client, err := storage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("storage.NewClient: %w", err)
	}
	defer client.Close()

	it := client.Bucket(bucketID).Objects(ctx, nil)
	for {
		attrs, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("Bucket(%q).Objects: %w", bucketID, err)
		}
		fmt.Fprintf(w, "Object: %s\n", attrs.Name)
	}

	return nil
}

// [END storage_v2_storage_objects_list]
