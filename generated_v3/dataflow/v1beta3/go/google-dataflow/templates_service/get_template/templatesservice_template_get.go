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

// [START dataflow_v1beta3_templatesservice_template_get]

import (
	"context"
	"fmt"
	"io"

	dataflow "cloud.google.com/go/dataflow/apiv1beta3"
	dataflowpb "cloud.google.com/go/dataflow/apiv1beta3/dataflowpb"
)

// getTemplate retrieves metadata for a Cloud Dataflow template.
func getTemplate(ctx context.Context, w io.Writer, projectID string, locationID string, gcsPath string) error {
	client, err := dataflow.NewTemplatesClient(ctx)
	if err != nil {
		return fmt.Errorf("NewTemplatesClient failed: %w", err)
	}
	defer client.Close()

	req := &dataflowpb.GetTemplateRequest{
		ProjectId: projectID,
		Location:  locationID,
		Template: &dataflowpb.GetTemplateRequest_GcsPath{
			GcsPath: gcsPath,
		},
		View: dataflowpb.GetTemplateRequest_METADATA_ONLY,
	}

	resp, err := client.GetTemplate(ctx, req)
	if err != nil {
		return fmt.Errorf("client.GetTemplate: %w", err)
	}

	fmt.Fprintf(w, "Template name: %s\n", resp.GetMetadata().GetName())
	fmt.Fprintf(w, "Description: %s\n", resp.GetMetadata().GetDescription())

	return nil
}

// [END dataflow_v1beta3_templatesservice_template_get]
