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

// [START retail_v2alpha_projectservice_loggingconfig_get]

import (
	"context"
	"fmt"
	"io"

	retail "cloud.google.com/go/retail/apiv2alpha"
	"cloud.google.com/go/retail/apiv2alpha/retailpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// getLoggingConfig retrieves the logging configuration for a project.
func getLoggingConfig(ctx context.Context, w io.Writer, projectID string) error {
	name := fmt.Sprintf("projects/%s/loggingConfig", projectID)

	client, err := retail.NewProjectClient(ctx)
	if err != nil {
		return fmt.Errorf("NewProjectClient: %w", err)
	}
	defer client.Close()

	req := &retailpb.GetLoggingConfigRequest{
		Name: name,
	}

	resp, err := client.GetLoggingConfig(ctx, req)
	if err != nil {
		if st, ok := status.FromError(err); ok && st.Code() == codes.FailedPrecondition {
			fmt.Fprintf(w, "Cloud Retail not enabled or terms not accepted for project %s: %s\n", projectID, st.Message())
			return nil
		}
		return fmt.Errorf("GetLoggingConfig: %w", err)
	}

	fmt.Fprintf(w, "Retrieved logging configuration: %s\n", resp.GetName())
	return nil
}

// [END retail_v2alpha_projectservice_loggingconfig_get]
