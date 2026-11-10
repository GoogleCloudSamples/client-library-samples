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

// [START documentai_v1beta3_documentprocessorservice_set_default_processor_version]

import (
	"context"
	"fmt"
	"io"

	documentai "cloud.google.com/go/documentai/apiv1beta3"
	"cloud.google.com/go/documentai/apiv1beta3/documentaipb"
	"google.golang.org/api/option"
)

// setDefaultProcessorVersion sets the default processor version for a Document AI processor.
func setDefaultProcessorVersion(ctx context.Context, w io.Writer, projectID string, locationID string, processorID string, processorVersionID string) error {
	processor := fmt.Sprintf("projects/%s/locations/%s/processors/%s", projectID, locationID, processorID)
	defaultProcessorVersion := fmt.Sprintf("projects/%s/locations/%s/processors/%s/processorVersions/%s", projectID, locationID, processorID, processorVersionID)

	endpoint := fmt.Sprintf("%s-documentai.googleapis.com:443", locationID)
	client, err := documentai.NewDocumentProcessorClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewDocumentProcessorClient failed: %w", err)
	}
	defer client.Close()

	req := &documentaipb.SetDefaultProcessorVersionRequest{
		Processor:               processor,
		DefaultProcessorVersion: defaultProcessorVersion,
	}

	op, err := client.SetDefaultProcessorVersion(ctx, req)
	if err != nil {
		return fmt.Errorf("SetDefaultProcessorVersion: %w", err)
	}

	if _, err := op.Wait(ctx); err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Set default processor version: %s\n", defaultProcessorVersion)

	return nil
}

// [END documentai_v1beta3_documentprocessorservice_set_default_processor_version]
