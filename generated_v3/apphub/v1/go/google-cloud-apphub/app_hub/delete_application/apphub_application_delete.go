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

// [START apphub_v1_apphub_application_delete]
import (
	"context"
	"fmt"
	"io"

	apphub "cloud.google.com/go/apphub/apiv1"
	apphubpb "cloud.google.com/go/apphub/apiv1/apphubpb"
)

// deleteApplication deletes an application in AppHub.
func deleteApplication(ctx context.Context, w io.Writer, projectID string, locationID string, applicationID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/applications/%s", projectID, locationID, applicationID)

	client, err := apphub.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("apphub.NewClient: %w", err)
	}
	defer client.Close()

	req := &apphubpb.DeleteApplicationRequest{
		Name: name,
	}

	op, err := client.DeleteApplication(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteApplication: %w", err)
	}

	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Deleted application: %s\n", name)
	return nil
}

// [END apphub_v1_apphub_application_delete]
