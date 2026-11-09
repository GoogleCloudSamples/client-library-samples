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

// [START dialogflow_v3_securitysettingsservice_securitysettings_create]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/option"
)

// createSecuritySettings creates security settings for the specified project and location.
func createSecuritySettings(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	securitySettings := &cxpb.SecuritySettings{
		DisplayName: "example-security-settings",
	}

	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewSecuritySettingsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewSecuritySettingsClient failed: %w", err)
	}
	defer client.Close()

	req := &cxpb.CreateSecuritySettingsRequest{
		Parent:           parent,
		SecuritySettings: securitySettings,
	}

	resp, err := client.CreateSecuritySettings(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateSecuritySettings failed: %w", err)
	}

	fmt.Fprintf(w, "Created security settings: %s\n", resp.GetName())
	return nil
}

// [END dialogflow_v3_securitysettingsservice_securitysettings_create]
