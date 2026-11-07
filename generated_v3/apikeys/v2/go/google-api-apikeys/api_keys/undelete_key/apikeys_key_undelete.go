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

// [START apikeys_v2_apikeys_undelete_key]

import (
	"context"
	"fmt"
	"io"

	apikeys "cloud.google.com/go/apikeys/apiv2"
	apikeyspb "cloud.google.com/go/apikeys/apiv2/apikeyspb"
)

// undeleteKey restores a deleted API key.
func undeleteKey(ctx context.Context, w io.Writer, projectID string, locationID string, keyID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/keys/%s", projectID, locationID, keyID)

	client, err := apikeys.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &apikeyspb.UndeleteKeyRequest{
		Name: name,
	}

	op, err := client.UndeleteKey(ctx, req)
	if err != nil {
		return fmt.Errorf("UndeleteKey failed: %w", err)
	}

	key, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Undeleted key: %s\n", key.GetName())
	return nil
}

// [END apikeys_v2_apikeys_undelete_key]
