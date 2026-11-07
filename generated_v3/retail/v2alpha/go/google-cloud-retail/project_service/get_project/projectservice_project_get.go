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

// [START retail_v2alpha_projectservice_project_get]

import (
	"context"
	"fmt"
	"io"

	retail "cloud.google.com/go/retail/apiv2alpha"
	retailpb "cloud.google.com/go/retail/apiv2alpha/retailpb"
)

// getProject retrieves the Retail project configuration for a Google Cloud project.
func getProject(ctx context.Context, w io.Writer, projectID string) error {
	name := fmt.Sprintf("projects/%s/retailProject", projectID)

	client, err := retail.NewProjectClient(ctx)
	if err != nil {
		return fmt.Errorf("NewProjectClient failed: %w", err)
	}
	defer client.Close()

	req := &retailpb.GetProjectRequest{
		Name: name,
	}

	response, err := client.GetProject(ctx, req)
	if err != nil {
		return fmt.Errorf("GetProject failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved project: %s\n", response.GetName())

	return nil
}

// [END retail_v2alpha_projectservice_project_get]
