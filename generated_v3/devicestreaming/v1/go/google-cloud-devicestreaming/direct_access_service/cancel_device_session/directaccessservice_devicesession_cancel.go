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

// [START devicestreaming_v1_directaccessservice_devicesession_cancel]

import (
	"context"
	"fmt"
	"io"

	devicestreaming "cloud.google.com/go/devicestreaming/apiv1"
	"cloud.google.com/go/devicestreaming/apiv1/devicestreamingpb"
)

// cancelDeviceSession cancels an active or pending device session.
func cancelDeviceSession(ctx context.Context, w io.Writer, projectID string, deviceSessionID string) error {
	name := fmt.Sprintf("projects/%s/deviceSessions/%s", projectID, deviceSessionID)

	client, err := devicestreaming.NewDirectAccessClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDirectAccessClient failed: %w", err)
	}
	defer client.Close()

	req := &devicestreamingpb.CancelDeviceSessionRequest{
		Name: name,
	}

	if err := client.CancelDeviceSession(ctx, req); err != nil {
		return fmt.Errorf("CancelDeviceSession failed: %w", err)
	}

	fmt.Fprintf(w, "Canceled device session: %s\n", name)
	return nil
}

// [END devicestreaming_v1_directaccessservice_devicesession_cancel]
