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

// [START cloudquotas_v1_quotaadjustersettingsmanager_quotaadjustersettings_update]

import (
	"context"
	"fmt"
	"io"

	cloudquotas "cloud.google.com/go/cloudquotas/apiv1beta"
	cloudquotaspb "cloud.google.com/go/cloudquotas/apiv1beta/cloudquotaspb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateQuotaAdjusterSettings updates the enablement status of the quota adjuster for a project.
func updateQuotaAdjusterSettings(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	quotaAdjusterSettings := &cloudquotaspb.QuotaAdjusterSettings{
		Name:       fmt.Sprintf("projects/%s/locations/%s/quotaAdjusterSettings", projectID, locationID),
		Enablement: cloudquotaspb.QuotaAdjusterSettings_ENABLED,
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"enablement"},
	}

	client, err := cloudquotas.NewQuotaAdjusterSettingsManagerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewQuotaAdjusterSettingsManagerClient failed: %w", err)
	}
	defer client.Close()

	req := &cloudquotaspb.UpdateQuotaAdjusterSettingsRequest{
		QuotaAdjusterSettings: quotaAdjusterSettings,
		UpdateMask:            updateMask,
	}

	resp, err := client.UpdateQuotaAdjusterSettings(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateQuotaAdjusterSettings failed: %w", err)
	}

	fmt.Fprintf(w, "Updated quota adjuster settings: %s (enablement: %s)\n", resp.GetName(), resp.GetEnablement())
	return nil
}

// [END cloudquotas_v1_quotaadjustersettingsmanager_quotaadjustersettings_update]
