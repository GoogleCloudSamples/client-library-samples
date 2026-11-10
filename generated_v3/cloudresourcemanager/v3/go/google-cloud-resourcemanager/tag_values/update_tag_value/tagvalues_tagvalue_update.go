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

// [START cloudresourcemanager_v3_tagvalues_tagvalue_update]

import (
	"context"
	"fmt"
	"io"

	cloudresourcemanager "cloud.google.com/go/resourcemanager/apiv3"
	resourcemanagerpb "cloud.google.com/go/resourcemanager/apiv3/resourcemanagerpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateTagValue updates the description of an existing TagValue resource.
func updateTagValue(ctx context.Context, w io.Writer, tagValueID string) error {
	tagValue := &resourcemanagerpb.TagValue{
		Name:        fmt.Sprintf("tagValues/%s", tagValueID),
		Description: "Updated description",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	client, err := cloudresourcemanager.NewTagValuesClient(ctx)
	if err != nil {
		return fmt.Errorf("NewTagValuesClient failed: %w", err)
	}
	defer client.Close()

	req := &resourcemanagerpb.UpdateTagValueRequest{
		TagValue:   tagValue,
		UpdateMask: updateMask,
	}

	op, err := client.UpdateTagValue(ctx, req)
	if err != nil {
		return fmt.Errorf("client.UpdateTagValue failed: %w", err)
	}

	updatedTagValue, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("op.Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated TagValue: %s\n", updatedTagValue.GetName())
	return nil
}

// [END cloudresourcemanager_v3_tagvalues_tagvalue_update]
