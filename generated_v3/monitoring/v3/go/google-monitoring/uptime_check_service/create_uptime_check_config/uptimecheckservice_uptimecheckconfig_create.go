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

// [START monitoring_v2_uptimecheckservice_uptimecheckconfig_create]

import (
	"context"
	"fmt"
	"io"
	"time"

	monitoring "cloud.google.com/go/monitoring/apiv3/v2"
	"cloud.google.com/go/monitoring/apiv3/v2/monitoringpb"
	"google.golang.org/genproto/googleapis/api/monitoredres"
	"google.golang.org/protobuf/types/known/durationpb"
)

// Use the CreateUptimeCheckConfig method.
func createUptimeCheckConfig(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)
	uptimeCheckConfig := &monitoringpb.UptimeCheckConfig{
		DisplayName: "Example Uptime Check",
		Resource: &monitoringpb.UptimeCheckConfig_MonitoredResource{
			MonitoredResource: &monitoredres.MonitoredResource{
				Type: "uptime_url",
				Labels: map[string]string{
					"host": "example.com",
				},
			},
		},
		CheckRequestType: &monitoringpb.UptimeCheckConfig_HttpCheck_{
			HttpCheck: &monitoringpb.UptimeCheckConfig_HttpCheck{
				Path: "/",
				Port: 80,
			},
		},
		Timeout: durationpb.New(10 * time.Second),
	}

	client, err := monitoring.NewUptimeCheckClient(ctx)
	if err != nil {
		return fmt.Errorf("NewUptimeCheckClient failed: %w", err)
	}
	defer client.Close()

	req := &monitoringpb.CreateUptimeCheckConfigRequest{
		Parent:            parent,
		UptimeCheckConfig: uptimeCheckConfig,
	}

	resp, err := client.CreateUptimeCheckConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateUptimeCheckConfig failed: %w", err)
	}

	fmt.Fprintf(w, "Created uptime check config: %s\n", resp.GetName())
	return nil
}

// [END monitoring_v2_uptimecheckservice_uptimecheckconfig_create]
