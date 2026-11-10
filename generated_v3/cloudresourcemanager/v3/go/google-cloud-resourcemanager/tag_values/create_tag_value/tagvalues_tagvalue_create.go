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

// [START cloudresourcemanager_v3_tagvalues_tagvalue_create]

import (
	"context"
	"fmt"
	"io"

	cloudresourcemanager "cloud.google.com/go/resourcemanager/apiv3"
	resourcemanagerpb "cloud.google.com/go/resourcemanager/apiv3/resourcemanagerpb"
)

// createTagValue creates a new TagValue resource under a parent TagKey.
func createTagValue(ctx context.Context, w io.Writer, tagKeyID string) error {
	client, err := cloudresourcemanager.NewTagValuesClient(ctx)
	if err != nil {
		return fmt.Errorf("NewTagValuesClient failed: %w", err)
	}
	defer client.Close()

	tagValue := &resourcemanagerpb.TagValue{
		Parent:      fmt.Sprintf("tagKeys/%s", tagKeyID),
		ShortName:   "example-value",
		Description: "example-description",
	}

	req := &resourcemanagerpb.CreateTagValueRequest{
		TagValue: tagValue,
	}

	op, err := client.CreateTagValue(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateTagValue failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created TagValue: %s\n", resp.GetName())
	return nil
}

// [END cloudresourcemanager_v3_tagvalues_tagvalue_create]
