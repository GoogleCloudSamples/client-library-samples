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

// [START apphub_v1_apphub_application_update]

import (
	"context"
	"fmt"
	"io"

	apphub "cloud.google.com/go/apphub/apiv1"
	apphubpb "cloud.google.com/go/apphub/apiv1/apphubpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateApplication updates an existing App Hub application description.
func updateApplication(ctx context.Context, w io.Writer, projectID string, locationID string, applicationID string) error {
	client, err := apphub.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	application := &apphubpb.Application{
		Name:        fmt.Sprintf("projects/%s/locations/%s/applications/%s", projectID, locationID, applicationID),
		Description: "Updated application description",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	req := &apphubpb.UpdateApplicationRequest{
		Application: application,
		UpdateMask:  updateMask,
	}

	op, err := client.UpdateApplication(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateApplication: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Updated application: %s\n", resp.GetName())
	return nil
}

// [END apphub_v1_apphub_application_update]
