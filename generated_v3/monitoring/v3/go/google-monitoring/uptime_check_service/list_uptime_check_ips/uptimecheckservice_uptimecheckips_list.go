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

// [START monitoring_v2_uptimecheckservice_uptimecheckips_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	monitoring "cloud.google.com/go/monitoring/apiv3/v2"
	monitoringpb "cloud.google.com/go/monitoring/apiv3/v2/monitoringpb"
	"google.golang.org/api/iterator"
)

// listUptimeCheckIps lists the IP addresses used to perform uptime checks.
func listUptimeCheckIps(ctx context.Context, w io.Writer) error {
	client, err := monitoring.NewUptimeCheckClient(ctx)
	if err != nil {
		return fmt.Errorf("NewUptimeCheckClient: %w", err)
	}
	defer client.Close()

	req := &monitoringpb.ListUptimeCheckIpsRequest{}
	it := client.ListUptimeCheckIps(ctx, req)
	for {
		ip, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("ListUptimeCheckIps: %w", err)
		}
		fmt.Fprintf(w, "Region: %s, Location: %s, IP: %s\n", ip.GetRegion(), ip.GetLocation(), ip.GetIpAddress())
	}

	return nil
}

// [END monitoring_v2_uptimecheckservice_uptimecheckips_list]
