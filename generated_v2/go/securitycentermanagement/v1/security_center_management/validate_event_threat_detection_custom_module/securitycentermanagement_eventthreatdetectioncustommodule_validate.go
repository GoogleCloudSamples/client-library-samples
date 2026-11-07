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

// [START securitycentermanagement_v1_securitycentermanagement_validate_event_threat_detection_custom_module]

import (
	"context"
	"fmt"
	"io"

	securitycentermanagement "cloud.google.com/go/securitycentermanagement/apiv1"
	"cloud.google.com/go/securitycentermanagement/apiv1/securitycentermanagementpb"
)

// validateEventThreatDetectionCustomModule validates an Event Threat Detection custom module configuration.
func validateEventThreatDetectionCustomModule(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	rawText := `{"ips": ["192.0.2.1"]}`
	moduleType := "CONFIGURABLE_BAD_IP"
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := securitycentermanagement.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &securitycentermanagementpb.ValidateEventThreatDetectionCustomModuleRequest{
		Parent:  parent,
		RawText: rawText,
		Type:    moduleType,
	}

	resp, err := client.ValidateEventThreatDetectionCustomModule(ctx, req)
	if err != nil {
		return fmt.Errorf("ValidateEventThreatDetectionCustomModule: %w", err)
	}

	fmt.Fprintf(w, "Validation response: %v\n", resp)
	return nil
}

// [END securitycentermanagement_v1_securitycentermanagement_validate_event_threat_detection_custom_module]
