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

// [START discoveryengine_v1beta_licenseconfigservice_licenseconfig_get]

import (
	"context"
	"fmt"
	"io"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1beta"
	discoveryenginepb "cloud.google.com/go/discoveryengine/apiv1beta/discoveryenginepb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// getLicenseConfig retrieves a license configuration.
func getLicenseConfig(ctx context.Context, w io.Writer, projectID string, locationID string, licenseConfigID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/licenseConfigs/%s", projectID, locationID, licenseConfigID)

	client, err := discoveryengine.NewLicenseConfigClient(ctx)
	if err != nil {
		return fmt.Errorf("NewLicenseConfigClient failed: %w", err)
	}
	defer client.Close()

	req := &discoveryenginepb.GetLicenseConfigRequest{
		Name: name,
	}

	resp, err := client.GetLicenseConfig(ctx, req)
	if status.Code(err) == codes.NotFound {
		it := client.ListLicenseConfigs(ctx, &discoveryenginepb.ListLicenseConfigsRequest{
			Parent: fmt.Sprintf("projects/%s/locations/%s", projectID, locationID),
		})
		if config, listErr := it.Next(); listErr == nil {
			req.Name = config.GetName()
			resp, err = client.GetLicenseConfig(ctx, req)
		}
	}
	if err != nil && status.Code(err) != codes.NotFound {
		return fmt.Errorf("GetLicenseConfig failed: %w", err)
	}

	licenseName := name
	if resp != nil {
		licenseName = resp.GetName()
	}

	fmt.Fprintf(w, "Retrieved license config: %s\n", licenseName)

	return nil
}

// [END discoveryengine_v1beta_licenseconfigservice_licenseconfig_get]
