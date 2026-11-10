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

// [START cloudresourcemanager_v3_tagholds_taghold_create]

import (
	"context"
	"fmt"
	"io"

	cloudresourcemanager "cloud.google.com/go/resourcemanager/apiv3"
	resourcemanagerpb "cloud.google.com/go/resourcemanager/apiv3/resourcemanagerpb"
)

// createTagHold creates a TagHold resource on a parent TagValue to prevent deletion.
func createTagHold(ctx context.Context, w io.Writer, tagValueID string) error {
	parent := fmt.Sprintf("tagValues/%s", tagValueID)
	tagHold := &resourcemanagerpb.TagHold{
		Holder: "//compute.googleapis.com/compute/projects/example-project/regions/us-east-1/instanceGroupManagers/example-group",
		Origin: "example-origin",
	}

	client, err := cloudresourcemanager.NewTagHoldsClient(ctx)
	if err != nil {
		return fmt.Errorf("NewTagHoldsClient: %w", err)
	}
	defer client.Close()

	req := &resourcemanagerpb.CreateTagHoldRequest{
		Parent:  parent,
		TagHold: tagHold,
	}

	op, err := client.CreateTagHold(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateTagHold: %w", err)
	}

	response, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Created TagHold: %s\n", response.GetName())

	return nil
}

// [END cloudresourcemanager_v3_tagholds_taghold_create]
