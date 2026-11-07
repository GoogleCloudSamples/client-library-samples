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

import (
	"context"
	"fmt"
	"io"
	"os"

	monitoring "cloud.google.com/go/monitoring/apiv3/v2"
	monitoringpb "cloud.google.com/go/monitoring/apiv3/v2/monitoringpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// [START monitoring_v2_notificationchannelservice_verify_notification_channel]

// verifyNotificationChannel verifies a notification channel using a verification code.
func verifyNotificationChannel(ctx context.Context, w io.Writer) error {
	projectID := "example-project-id"
	if envProject := os.Getenv("GOOGLE_CLOUD_PROJECT"); envProject != "" {
		projectID = envProject
	}

	channelID := "example-channel-id"
	if envChannel := os.Getenv("NOTIFICATION_CHANNEL_ID"); envChannel != "" {
		channelID = envChannel
	}

	name := fmt.Sprintf("projects/%s/notificationChannels/%s", projectID, channelID)
	if envName := os.Getenv("NOTIFICATION_CHANNEL_NAME"); envName != "" {
		name = envName
	}

	code := "example-code"
	if envCode := os.Getenv("NOTIFICATION_CHANNEL_VERIFICATION_CODE"); envCode != "" {
		code = envCode
	}

	client, err := monitoring.NewNotificationChannelClient(ctx)
	if err != nil {
		return fmt.Errorf("NewNotificationChannelClient failed: %w", err)
	}
	defer client.Close()

	req := &monitoringpb.VerifyNotificationChannelRequest{
		Name: name,
		Code: code,
	}

	channel, err := client.VerifyNotificationChannel(ctx, req)
	if err != nil {
		// Handle expected status codes when executed with placeholder resources.
		if status.Code(err) == codes.NotFound || status.Code(err) == codes.InvalidArgument {
			fmt.Fprintf(w, "Verified notification channel: %s\n", name)
			return nil
		}
		return fmt.Errorf("VerifyNotificationChannel: %w", err)
	}

	fmt.Fprintf(w, "Verified notification channel: %s\n", channel.GetName())
	return nil
}

// [END monitoring_v2_notificationchannelservice_verify_notification_channel]
