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

// [START dataproc_v1_sessiontemplatecontroller_sessiontemplate_create]

import (
	"context"
	"fmt"
	"io"

	dataproc "cloud.google.com/go/dataproc/v2/apiv1"
	"cloud.google.com/go/dataproc/v2/apiv1/dataprocpb"
	"google.golang.org/api/option"
)

// createSessionTemplate creates a Dataproc session template in the specified region.
func createSessionTemplate(ctx context.Context, w io.Writer, projectID string, locationID string, sessionTemplateID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	sessionTemplate := &dataprocpb.SessionTemplate{
		Name:        fmt.Sprintf("projects/%s/locations/%s/sessionTemplates/%s", projectID, locationID, sessionTemplateID),
		Description: "Sample Dataproc Session Template",
		SessionConfig: &dataprocpb.SessionTemplate_JupyterSession{
			JupyterSession: &dataprocpb.JupyterConfig{
				Kernel:      dataprocpb.JupyterConfig_PYTHON,
				DisplayName: "Example Jupyter Session",
			},
		},
	}

	// Dataproc API calls require regional endpoints.
	endpoint := fmt.Sprintf("%s-dataproc.googleapis.com:443", locationID)
	client, err := dataproc.NewSessionTemplateControllerClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewSessionTemplateControllerClient failed: %w", err)
	}
	defer client.Close()

	req := &dataprocpb.CreateSessionTemplateRequest{
		Parent:          parent,
		SessionTemplate: sessionTemplate,
	}

	resp, err := client.CreateSessionTemplate(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateSessionTemplate: %w", err)
	}

	fmt.Fprintf(w, "Created session template: %s\n", resp.GetName())
	return nil
}

// [END dataproc_v1_sessiontemplatecontroller_sessiontemplate_create]
