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

// [START apikeys_v2_apikeys_key_delete]

import (
	"context"
	"fmt"
	"io"

	apikeys "cloud.google.com/go/apikeys/apiv2"
	"cloud.google.com/go/apikeys/apiv2/apikeyspb"
)

// Use the DeleteKey method.
func deleteKey(ctx context.Context, w io.Writer, projectID string, locationID string, keyID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/keys/%s", projectID, locationID, keyID)

	client, err := apikeys.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &apikeyspb.DeleteKeyRequest{
		Name: name,
	}

	op, err := client.DeleteKey(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteKey failed: %w", err)
	}

	// DeleteKey returns a long-running operation that must be awaited.
	deletedKey, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted key: %s\n", deletedKey.GetName())

	return nil
}

// [END apikeys_v2_apikeys_key_delete]
