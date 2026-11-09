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

// [START dialogflow_v3_securitysettingsservice_securitysettings_get]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/option"
)

// getSecuritySettings retrieves the specified security settings.
func getSecuritySettings(ctx context.Context, w io.Writer, projectID string, locationID string, securitysettingsID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/securitySettings/%s", projectID, locationID, securitysettingsID)

	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewSecuritySettingsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewSecuritySettingsClient failed: %w", err)
	}
	defer client.Close()

	req := &cxpb.GetSecuritySettingsRequest{
		Name: name,
	}

	resp, err := client.GetSecuritySettings(ctx, req)
	if err != nil {
		return fmt.Errorf("GetSecuritySettings failed: %w", err)
	}

	fmt.Fprintf(w, "Security settings name: %s\n", resp.GetName())
	fmt.Fprintf(w, "Display name: %s\n", resp.GetDisplayName())

	return nil
}

// [END dialogflow_v3_securitysettingsservice_securitysettings_get]
