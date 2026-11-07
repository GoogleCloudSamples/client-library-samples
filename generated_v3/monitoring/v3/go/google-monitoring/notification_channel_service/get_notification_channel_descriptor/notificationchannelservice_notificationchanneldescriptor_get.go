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

// [START monitoring_v2_notificationchannelservice_notificationchanneldescriptor_get]

import (
	"context"
	"fmt"
	"io"

	monitoring "cloud.google.com/go/monitoring/apiv3/v2"
	monitoringpb "cloud.google.com/go/monitoring/apiv3/v2/monitoringpb"
)

// Use the GetNotificationChannelDescriptor method.
func getNotificationChannelDescriptor(ctx context.Context, w io.Writer, notificationChannelDescriptorID string, projectID string) error {
	name := fmt.Sprintf("projects/%s/notificationChannelDescriptors/%s", projectID, notificationChannelDescriptorID)

	client, err := monitoring.NewNotificationChannelClient(ctx)
	if err != nil {
		return fmt.Errorf("NewNotificationChannelClient failed: %w", err)
	}
	defer client.Close()

	req := &monitoringpb.GetNotificationChannelDescriptorRequest{
		Name: name,
	}

	descriptor, err := client.GetNotificationChannelDescriptor(ctx, req)
	if err != nil {
		return fmt.Errorf("GetNotificationChannelDescriptor: %w", err)
	}

	fmt.Fprintf(w, "Retrieved descriptor: %s (%s)\n", descriptor.GetName(), descriptor.GetDisplayName())

	return nil
}

// [END monitoring_v2_notificationchannelservice_notificationchanneldescriptor_get]
