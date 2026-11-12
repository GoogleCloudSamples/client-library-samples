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

// [START monitoring_v2_notificationchannelservice_notificationchannel_delete]

import (
	"context"
	"fmt"
	"io"

	monitoring "cloud.google.com/go/monitoring/apiv3/v2"
	monitoringpb "cloud.google.com/go/monitoring/apiv3/v2/monitoringpb"
)

// deleteNotificationChannel deletes a notification channel by ID.
func deleteNotificationChannel(ctx context.Context, w io.Writer, notificationChannelID string, projectID string) error {
	name := fmt.Sprintf("projects/%s/notificationChannels/%s", projectID, notificationChannelID)

	client, err := monitoring.NewNotificationChannelClient(ctx)
	if err != nil {
		return fmt.Errorf("NewNotificationChannelClient failed: %w", err)
	}
	defer client.Close()

	req := &monitoringpb.DeleteNotificationChannelRequest{
		Name: name,
	}

	if err := client.DeleteNotificationChannel(ctx, req); err != nil {
		return fmt.Errorf("DeleteNotificationChannel: %w", err)
	}

	fmt.Fprintf(w, "Deleted notification channel: %s\n", name)
	return nil
}

// [END monitoring_v2_notificationchannelservice_notificationchannel_delete]
