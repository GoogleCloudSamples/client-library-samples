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

// [START monitoring_v2_notificationchannelservice_notificationchanneldescriptors_list]

import (
	"context"
	"fmt"
	"io"

	monitoring "cloud.google.com/go/monitoring/apiv3/v2"
	monitoringpb "cloud.google.com/go/monitoring/apiv3/v2/monitoringpb"
	"google.golang.org/api/iterator"
)

// listNotificationChannelDescriptors lists notification channel descriptors supported by Cloud Monitoring.
func listNotificationChannelDescriptors(ctx context.Context, w io.Writer, projectID string) error {
	name := fmt.Sprintf("projects/%s", projectID)

	client, err := monitoring.NewNotificationChannelClient(ctx)
	if err != nil {
		return fmt.Errorf("NewNotificationChannelClient: %w", err)
	}
	defer client.Close()

	req := &monitoringpb.ListNotificationChannelDescriptorsRequest{
		Name: name,
	}

	it := client.ListNotificationChannelDescriptors(ctx, req)
	for {
		descriptor, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListNotificationChannelDescriptors: %w", err)
		}
		fmt.Fprintf(w, "Descriptor type: %s, display name: %s\n", descriptor.GetType(), descriptor.GetDisplayName())
	}

	return nil
}

// [END monitoring_v2_notificationchannelservice_notificationchanneldescriptors_list]
