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

// [START monitoring_v2_uptimecheckservice_uptimecheckconfigs_list]

import (
	"context"
	"fmt"
	"io"

	monitoring "cloud.google.com/go/monitoring/apiv3/v2"
	"cloud.google.com/go/monitoring/apiv3/v2/monitoringpb"
	"google.golang.org/api/iterator"
)

// listUptimeCheckConfigs lists the Uptime check configurations in a project.
func listUptimeCheckConfigs(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)

	client, err := monitoring.NewUptimeCheckClient(ctx)
	if err != nil {
		return fmt.Errorf("NewUptimeCheckClient failed: %w", err)
	}
	defer client.Close()

	req := &monitoringpb.ListUptimeCheckConfigsRequest{
		Parent: parent,
	}

	it := client.ListUptimeCheckConfigs(ctx, req)
	for {
		config, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListUptimeCheckConfigs failed: %w", err)
		}
		fmt.Fprintf(w, "Uptime check config: %s (%s)\n", config.GetDisplayName(), config.GetName())
	}

	return nil
}

// [END monitoring_v2_uptimecheckservice_uptimecheckconfigs_list]
