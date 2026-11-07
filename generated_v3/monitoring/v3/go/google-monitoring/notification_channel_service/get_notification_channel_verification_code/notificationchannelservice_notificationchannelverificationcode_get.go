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

// [START monitoring_v2_notificationchannelservice_notificationchannelverificationcode_get]

import (
	"context"
	"fmt"
	"io"

	monitoring "cloud.google.com/go/monitoring/apiv3/v2"
	"cloud.google.com/go/monitoring/apiv3/v2/monitoringpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// getNotificationChannelVerificationCode gets the verification code for an existing notification channel.
func getNotificationChannelVerificationCode(ctx context.Context, w io.Writer, projectID string, notificationChannelID string) error {
	name := fmt.Sprintf("projects/%s/notificationChannels/%s", projectID, notificationChannelID)

	client, err := monitoring.NewNotificationChannelClient(ctx)
	if err != nil {
		return fmt.Errorf("NewNotificationChannelClient failed: %w", err)
	}
	defer client.Close()

	req := &monitoringpb.GetNotificationChannelVerificationCodeRequest{
		Name: name,
	}

	resp, err := client.GetNotificationChannelVerificationCode(ctx, req)
	if err != nil {
		// Channels must be verified before a verification code can be retrieved.
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintf(w, "Channel %s is unverified; verification code cannot be retrieved.\n", notificationChannelID)
			return nil
		}
		return fmt.Errorf("GetNotificationChannelVerificationCode: %w", err)
	}

	fmt.Fprintf(w, "Verification code: %s\n", resp.GetCode())
	return nil
}

// [END monitoring_v2_notificationchannelservice_notificationchannelverificationcode_get]
