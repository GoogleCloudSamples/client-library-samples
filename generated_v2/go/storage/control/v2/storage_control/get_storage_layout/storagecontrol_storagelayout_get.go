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

// [START storage_v2_storagecontrol_storagelayout_get]

import (
	"context"
	"fmt"
	"io"

	storage "cloud.google.com/go/storage/control/apiv2"
	controlpb "cloud.google.com/go/storage/control/apiv2/controlpb"
)

// getStorageLayout retrieves the storage layout configuration of a Cloud Storage bucket.
func getStorageLayout(ctx context.Context, w io.Writer, projectID string, bucketID string) error {
	_ = projectID
	name := fmt.Sprintf("projects/_/buckets/%s/storageLayout", bucketID)

	client, err := storage.NewStorageControlClient(ctx)
	if err != nil {
		return fmt.Errorf("NewStorageControlClient: %w", err)
	}
	defer client.Close()

	req := &controlpb.GetStorageLayoutRequest{
		Name: name,
	}

	resp, err := client.GetStorageLayout(ctx, req)
	if err != nil {
		return fmt.Errorf("GetStorageLayout: %w", err)
	}

	fmt.Fprintf(w, "Storage layout name: %s\n", resp.GetName())
	fmt.Fprintf(w, "Location: %s\n", resp.GetLocation())
	fmt.Fprintf(w, "Location type: %s\n", resp.GetLocationType())

	return nil
}

// [END storage_v2_storagecontrol_storagelayout_get]
