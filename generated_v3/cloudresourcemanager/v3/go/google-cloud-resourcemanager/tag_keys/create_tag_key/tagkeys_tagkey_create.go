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

// [START cloudresourcemanager_v3_tagkeys_tagkey_create]

import (
	"context"
	"fmt"
	"io"

	cloudresourcemanager "cloud.google.com/go/resourcemanager/apiv3"
	resourcemanagerpb "cloud.google.com/go/resourcemanager/apiv3/resourcemanagerpb"
)

// createTagKey creates a new TagKey resource under a parent project.
func createTagKey(ctx context.Context, w io.Writer, projectID string) error {
	tagKey := &resourcemanagerpb.TagKey{
		Parent:      fmt.Sprintf("projects/%s", projectID),
		ShortName:   "example_tag_key",
		Description: "Example Tag Key",
	}

	client, err := cloudresourcemanager.NewTagKeysClient(ctx)
	if err != nil {
		return fmt.Errorf("NewTagKeysClient failed: %w", err)
	}
	defer client.Close()

	req := &resourcemanagerpb.CreateTagKeyRequest{
		TagKey: tagKey,
	}

	op, err := client.CreateTagKey(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateTagKey failed: %w", err)
	}

	// CreateTagKey is a long-running operation; wait for it to complete.
	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("CreateTagKey operation wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created TagKey: %s\n", resp.GetName())
	return nil
}

// [END cloudresourcemanager_v3_tagkeys_tagkey_create]
