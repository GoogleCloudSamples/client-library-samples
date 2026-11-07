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

// [START cloudquotas_v1beta_quotaadjustersettingsmanager_quotaadjustersettings_get]

import (
	"context"
	"fmt"
	"io"

	cloudquotas "cloud.google.com/go/cloudquotas/apiv1beta"
	cloudquotaspb "cloud.google.com/go/cloudquotas/apiv1beta/cloudquotaspb"
)

// getQuotaAdjusterSettings retrieves the quota adjuster settings for a project and location.
func getQuotaAdjusterSettings(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/quotaAdjusterSettings", projectID, locationID)

	client, err := cloudquotas.NewQuotaAdjusterSettingsManagerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewQuotaAdjusterSettingsManagerClient failed: %w", err)
	}
	defer client.Close()

	req := &cloudquotaspb.GetQuotaAdjusterSettingsRequest{
		Name: name,
	}

	settings, err := client.GetQuotaAdjusterSettings(ctx, req)
	if err != nil {
		return fmt.Errorf("GetQuotaAdjusterSettings failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved quota adjuster settings: %s\n", settings.GetName())
	fmt.Fprintf(w, "Enablement: %s\n", settings.GetEnablement())

	return nil
}

// [END cloudquotas_v1beta_quotaadjustersettingsmanager_quotaadjustersettings_get]
