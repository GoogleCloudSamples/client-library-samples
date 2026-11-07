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

// [START clouderrorreporting_v1beta1_errorstatsservice_events_delete]

import (
	"context"
	"fmt"
	"io"

	clouderrorreporting "cloud.google.com/go/errorreporting/apiv1beta1"
	"cloud.google.com/go/errorreporting/apiv1beta1/errorreportingpb"
)

// deleteEvents deletes all error events in the specified project.
func deleteEvents(ctx context.Context, w io.Writer, projectID string) error {
	projectName := fmt.Sprintf("projects/%s", projectID)

	client, err := clouderrorreporting.NewErrorStatsClient(ctx)
	if err != nil {
		return fmt.Errorf("NewErrorStatsClient: %w", err)
	}
	defer client.Close()

	req := &errorreportingpb.DeleteEventsRequest{
		ProjectName: projectName,
	}

	if _, err := client.DeleteEvents(ctx, req); err != nil {
		return fmt.Errorf("DeleteEvents: %w", err)
	}

	fmt.Fprintf(w, "Deleted events for project: %s\n", projectName)
	return nil
}

// [END clouderrorreporting_v1beta1_errorstatsservice_events_delete]
