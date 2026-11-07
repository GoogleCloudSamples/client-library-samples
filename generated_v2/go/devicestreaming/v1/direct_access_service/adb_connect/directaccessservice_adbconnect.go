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

// [START devicestreaming_v1_directaccessservice_adb_connect]

import (
	"context"
	"fmt"
	"io"
	"strconv"

	devicestreaming "cloud.google.com/go/devicestreaming/apiv1"
	"cloud.google.com/go/devicestreaming/apiv1/devicestreamingpb"
	"google.golang.org/grpc/metadata"
)

// adbConnect establishes an ADB connection stream to a device session.
func adbConnect(ctx context.Context, w io.Writer, streamID string) error {
	client, err := devicestreaming.NewDirectAccessClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDirectAccessClient failed: %w", err)
	}
	defer client.Close()

	streamIDInt := int32(1)
	if streamID != "" {
		parsed, err := strconv.ParseInt(streamID, 10, 32)
		if err != nil {
			return fmt.Errorf("strconv.ParseInt failed: %w", err)
		}
		streamIDInt = int32(parsed)
	}

	projectID := "example-project-id"
	deviceSessionID := "example-device-session"
	sessionName := fmt.Sprintf("projects/%s/deviceSessions/%s", projectID, deviceSessionID)

	// DirectAccessService requires the active DeviceSession resource name in the gRPC metadata header.
	ctx = metadata.AppendToOutgoingContext(ctx, "X-Omnilab-Session-Name", sessionName)

	stream, err := client.AdbConnect(ctx)
	if err != nil {
		return fmt.Errorf("AdbConnect failed: %w", err)
	}

	req := &devicestreamingpb.AdbMessage{
		Contents: &devicestreamingpb.AdbMessage_Open{
			Open: &devicestreamingpb.Open{
				StreamId: streamIDInt,
				Service:  "shell:ls",
			},
		},
	}

	if err := stream.Send(req); err != nil {
		return fmt.Errorf("stream.Send failed: %w", err)
	}
	fmt.Fprintf(w, "Sent ADB open message for stream ID: %d\n", streamIDInt)

	if err := stream.CloseSend(); err != nil {
		return fmt.Errorf("stream.CloseSend failed: %w", err)
	}

	return nil
}

// [END devicestreaming_v1_directaccessservice_adb_connect]
