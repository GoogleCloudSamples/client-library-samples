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

// [START apphub_v1_apphub_application_create]

import (
	"context"
	"fmt"
	"io"

	apphub "cloud.google.com/go/apphub/apiv1"
	apphubpb "cloud.google.com/go/apphub/apiv1/apphubpb"
)

// Use the CreateApplication method.
func createApplication(ctx context.Context, w io.Writer, projectID string, locationID string, applicationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	application := &apphubpb.Application{
		Scope: &apphubpb.Scope{
			Type: apphubpb.Scope_REGIONAL,
		},
	}

	client, err := apphub.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &apphubpb.CreateApplicationRequest{
		Parent:        parent,
		ApplicationId: applicationID,
		Application:   application,
	}

	op, err := client.CreateApplication(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateApplication failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created application: %s\n", resp.GetName())
	return nil
}

// [END apphub_v1_apphub_application_create]
