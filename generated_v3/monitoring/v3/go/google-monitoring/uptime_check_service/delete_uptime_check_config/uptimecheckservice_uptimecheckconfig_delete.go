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

// [START monitoring_v2_uptimecheckservice_uptimecheckconfig_delete]

import (
	"context"
	"fmt"
	"io"

	monitoring "cloud.google.com/go/monitoring/apiv3/v2"
	monitoringpb "cloud.google.com/go/monitoring/apiv3/v2/monitoringpb"
)

// deleteUptimeCheckConfig deletes an existing Uptime check configuration.
func deleteUptimeCheckConfig(ctx context.Context, w io.Writer, uptimeCheckConfigID string, projectID string) error {
	name := fmt.Sprintf("projects/%s/uptimeCheckConfigs/%s", projectID, uptimeCheckConfigID)

	client, err := monitoring.NewUptimeCheckClient(ctx)
	if err != nil {
		return fmt.Errorf("NewUptimeCheckClient failed: %w", err)
	}
	defer client.Close()

	req := &monitoringpb.DeleteUptimeCheckConfigRequest{
		Name: name,
	}

	if err := client.DeleteUptimeCheckConfig(ctx, req); err != nil {
		return fmt.Errorf("DeleteUptimeCheckConfig: %w", err)
	}

	fmt.Fprintf(w, "Deleted uptime check config: %s\n", name)
	return nil
}

// [END monitoring_v2_uptimecheckservice_uptimecheckconfig_delete]
