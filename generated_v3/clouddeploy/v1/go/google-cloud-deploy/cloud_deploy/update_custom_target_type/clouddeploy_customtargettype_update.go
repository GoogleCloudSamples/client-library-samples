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

// [START clouddeploy_v1_clouddeploy_customtargettype_update]

import (
	"context"
	"fmt"
	"io"

	clouddeploy "cloud.google.com/go/deploy/apiv1"
	"cloud.google.com/go/deploy/apiv1/deploypb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateCustomTargetType updates the description of an existing custom target type.
func updateCustomTargetType(ctx context.Context, w io.Writer, projectID string, locationID string, customTargetTypeID string) error {
	client, err := clouddeploy.NewCloudDeployClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudDeployClient failed: %w", err)
	}
	defer client.Close()

	customTargetType := &deploypb.CustomTargetType{
		Name:        fmt.Sprintf("projects/%s/locations/%s/customTargetTypes/%s", projectID, locationID, customTargetTypeID),
		Description: "Updated custom target type description",
	}

	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	req := &deploypb.UpdateCustomTargetTypeRequest{
		UpdateMask:       updateMask,
		CustomTargetType: customTargetType,
	}

	op, err := client.UpdateCustomTargetType(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateCustomTargetType failed: %w", err)
	}

	res, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated custom target type: %s\n", res.GetName())

	return nil
}

// [END clouddeploy_v1_clouddeploy_customtargettype_update]
