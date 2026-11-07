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

// [START servicemanagement_v1_servicemanager_submit_config_source]

import (
	"context"
	"fmt"
	"io"

	servicemanagement "cloud.google.com/go/servicemanagement/apiv1"
	servicemanagementpb "cloud.google.com/go/servicemanagement/apiv1/servicemanagementpb"
)

// submitConfigSource submits a configuration source for a managed service.
func submitConfigSource(ctx context.Context, w io.Writer, serviceName string) error {
	configSource := &servicemanagementpb.ConfigSource{
		Files: []*servicemanagementpb.ConfigFile{
			{
				FilePath: "openapi.yaml",
				FileContents: []byte(fmt.Sprintf(
					"swagger: '2.0'\n"+
						"info:\n"+
						"  title: Example Service\n"+
						"  version: '1.0.0'\n"+
						"host: %s\n"+
						"paths: {}\n",
					serviceName,
				)),
				FileType: servicemanagementpb.ConfigFile_OPEN_API_YAML,
			},
		},
	}

	client, err := servicemanagement.NewServiceManagerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewServiceManagerClient: %w", err)
	}
	defer client.Close()

	req := &servicemanagementpb.SubmitConfigSourceRequest{
		ServiceName:  serviceName,
		ConfigSource: configSource,
	}

	op, err := client.SubmitConfigSource(ctx, req)
	if err != nil {
		return fmt.Errorf("SubmitConfigSource: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Submitted configuration source for service %s; generated config ID: %s\n",
		serviceName,
		resp.GetServiceConfig().GetId(),
	)

	return nil
}

// [END servicemanagement_v1_servicemanager_submit_config_source]
