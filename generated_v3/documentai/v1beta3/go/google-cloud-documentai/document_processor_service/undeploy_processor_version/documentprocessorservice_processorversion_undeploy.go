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

// [START documentai_v1beta3_documentprocessorservice_undeploy_processor_version]

import (
	"context"
	"fmt"
	"io"
	"strings"

	documentai "cloud.google.com/go/documentai/apiv1beta3"
	"cloud.google.com/go/documentai/apiv1beta3/documentaipb"
	"google.golang.org/api/option"
)

// undeployProcessorVersion undeploys an active processor version.
func undeployProcessorVersion(ctx context.Context, w io.Writer, projectID string, locationID string, processorID string, processorVersionID string) error {
	endpoint := fmt.Sprintf("%s-documentai.googleapis.com:443", locationID)
	client, err := documentai.NewDocumentProcessorClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewDocumentProcessorClient: %w", err)
	}
	defer client.Close()

	name := fmt.Sprintf("projects/%s/locations/%s/processors/%s/processorVersions/%s", projectID, locationID, processorID, processorVersionID)

	req := &documentaipb.UndeployProcessorVersionRequest{
		Name: name,
	}

	op, err := client.UndeployProcessorVersion(ctx, req)
	if err != nil {
		// Pretrained processor versions are Google-managed and cannot change deployment state.
		if strings.Contains(err.Error(), "PRETRAINED_PROCESSOR_VERSION_STATE_CHANGE") || strings.Contains(err.Error(), "is pretrained by Google and cannot change states") {
			fmt.Fprintf(w, "Processor version is pretrained and cannot be undeployed: %s\n", name)
			return nil
		}
		return fmt.Errorf("UndeployProcessorVersion: %w", err)
	}

	if _, err := op.Wait(ctx); err != nil {
		if strings.Contains(err.Error(), "PRETRAINED_PROCESSOR_VERSION_STATE_CHANGE") || strings.Contains(err.Error(), "is pretrained by Google and cannot change states") {
			fmt.Fprintf(w, "Processor version is pretrained and cannot be undeployed: %s\n", name)
			return nil
		}
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Processor version undeployed: %s\n", name)

	return nil
}

// [END documentai_v1beta3_documentprocessorservice_undeploy_processor_version]
