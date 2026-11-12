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

// [START monitoring_v2_notificationchannelservice_notificationchannel_create]

import (
	"context"
	"fmt"
	"io"

	monitoring "cloud.google.com/go/monitoring/apiv3/v2"
	"cloud.google.com/go/monitoring/apiv3/v2/monitoringpb"
)

// createNotificationChannel creates a notification channel in a project.
func createNotificationChannel(ctx context.Context, w io.Writer, projectID string) error {
	name := fmt.Sprintf("projects/%s", projectID)
	notificationChannel := &monitoringpb.NotificationChannel{
		Type:        "email",
		DisplayName: "Alert Notification Channel",
		Description: "Channel for alert notifications",
		Labels: map[string]string{
			"email_address": "alerts@example.com",
		},
	}

	client, err := monitoring.NewNotificationChannelClient(ctx)
	if err != nil {
		return fmt.Errorf("NewNotificationChannelClient: %w", err)
	}
	defer client.Close()

	req := &monitoringpb.CreateNotificationChannelRequest{
		Name:                name,
		NotificationChannel: notificationChannel,
	}

	createdChannel, err := client.CreateNotificationChannel(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateNotificationChannel: %w", err)
	}

	fmt.Fprintf(w, "Created notification channel: %s\n", createdChannel.GetName())
	return nil
}

// [END monitoring_v2_notificationchannelservice_notificationchannel_create]
