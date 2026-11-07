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

// [START monitoring_v2_uptimecheckservice_uptimecheckconfig_update]

import (
	"context"
	"fmt"
	"io"

	monitoring "cloud.google.com/go/monitoring/apiv3/v2"
	monitoringpb "cloud.google.com/go/monitoring/apiv3/v2/monitoringpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateUptimeCheckConfig updates the display name of an existing uptime check configuration.
func updateUptimeCheckConfig(ctx context.Context, w io.Writer, projectID string, uptimeCheckConfigID string) error {
	uptimeCheckConfig := &monitoringpb.UptimeCheckConfig{
		Name:        fmt.Sprintf("projects/%s/uptimeCheckConfigs/%s", projectID, uptimeCheckConfigID),
		DisplayName: "Updated Uptime Check",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"display_name"},
	}

	client, err := monitoring.NewUptimeCheckClient(ctx)
	if err != nil {
		return fmt.Errorf("NewUptimeCheckClient failed: %w", err)
	}
	defer client.Close()

	req := &monitoringpb.UpdateUptimeCheckConfigRequest{
		UptimeCheckConfig: uptimeCheckConfig,
		UpdateMask:        updateMask,
	}

	resp, err := client.UpdateUptimeCheckConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateUptimeCheckConfig failed: %w", err)
	}

	fmt.Fprintf(w, "Updated uptime check config: %s\n", resp.GetName())
	return nil
}

// [END monitoring_v2_uptimecheckservice_uptimecheckconfig_update]
