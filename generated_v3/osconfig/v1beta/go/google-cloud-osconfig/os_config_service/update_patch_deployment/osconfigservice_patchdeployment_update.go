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

// [START osconfig_v1beta_osconfigservice_patchdeployment_update]

import (
	"context"
	"fmt"
	"io"
	"time"

	osconfig "cloud.google.com/go/osconfig/apiv1beta"
	osconfigpb "cloud.google.com/go/osconfig/apiv1beta/osconfigpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

// updatePatchDeployment updates the description of an existing patch deployment.
func updatePatchDeployment(ctx context.Context, w io.Writer, projectID string, patchDeploymentID string) error {
	patchDeployment := &osconfigpb.PatchDeployment{
		Name:        fmt.Sprintf("projects/%s/patchDeployments/%s", projectID, patchDeploymentID),
		Description: "Updated patch deployment description",
		InstanceFilter: &osconfigpb.PatchInstanceFilter{
			All: true,
		},
		Schedule: &osconfigpb.PatchDeployment_OneTimeSchedule{
			OneTimeSchedule: &osconfigpb.OneTimeSchedule{
				ExecuteTime: timestamppb.New(time.Now().Add(24 * time.Hour)),
			},
		},
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	client, err := osconfig.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("osconfig.NewClient: %w", err)
	}
	defer client.Close()

	req := &osconfigpb.UpdatePatchDeploymentRequest{
		PatchDeployment: patchDeployment,
		UpdateMask:      updateMask,
	}

	resp, err := client.UpdatePatchDeployment(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdatePatchDeployment: %w", err)
	}

	fmt.Fprintf(w, "Updated patch deployment: %s\n", resp.GetName())
	return nil
}

// [END osconfig_v1beta_osconfigservice_patchdeployment_update]
