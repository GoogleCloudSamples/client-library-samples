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

// [START securitycentermanagement_v1_securitycentermanagement_securitycenterservice_update]

import (
	"context"
	"fmt"
	"io"
	"os"

	securitycentermanagement "cloud.google.com/go/securitycentermanagement/apiv1"
	securitycentermanagementpb "cloud.google.com/go/securitycentermanagement/apiv1/securitycentermanagementpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateSecurityCenterService updates the enablement state of a Security Center service.
func updateSecurityCenterService(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = "example-project-id"
	}

	client, err := securitycentermanagement.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	securityCenterService := &securitycentermanagementpb.SecurityCenterService{
		Name:                    fmt.Sprintf("projects/%s/locations/global/securityCenterServices/container-threat-detection", projectID),
		IntendedEnablementState: securitycentermanagementpb.SecurityCenterService_ENABLED,
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"intended_enablement_state"},
	}

	req := &securitycentermanagementpb.UpdateSecurityCenterServiceRequest{
		SecurityCenterService: securityCenterService,
		UpdateMask:            updateMask,
	}

	resp, err := client.UpdateSecurityCenterService(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateSecurityCenterService failed: %w", err)
	}

	fmt.Fprintf(w, "Updated Security Center service: %s\n", resp.GetName())
	return nil
}

// [END securitycentermanagement_v1_securitycentermanagement_securitycenterservice_update]
