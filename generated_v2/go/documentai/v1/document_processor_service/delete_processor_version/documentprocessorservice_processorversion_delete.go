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

// [START documentai_v1_documentprocessorservice_processorversion_delete]

import (
	"context"
	"fmt"
	"io"
	"strings"

	documentai "cloud.google.com/go/documentai/apiv1beta3"
	"cloud.google.com/go/documentai/apiv1beta3/documentaipb"
	"google.golang.org/api/option"
)

// deleteProcessorVersion deletes a specified processor version.
func deleteProcessorVersion(ctx context.Context, w io.Writer, projectID string, locationID string, processorID string, processorVersionID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/processors/%s/processorVersions/%s", projectID, locationID, processorID, processorVersionID)

	endpoint := fmt.Sprintf("%s-documentai.googleapis.com:443", locationID)
	client, err := documentai.NewDocumentProcessorClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewDocumentProcessorClient: %w", err)
	}
	defer client.Close()

	req := &documentaipb.DeleteProcessorVersionRequest{
		Name: name,
	}

	op, err := client.DeleteProcessorVersion(ctx, req)
	if err != nil {
		if strings.Contains(strings.ToLower(err.Error()), "pretrained") {
			fmt.Fprintf(w, "Processor version is pretrained by Google and cannot be deleted: %s\n", name)
			return nil
		}
		return fmt.Errorf("DeleteProcessorVersion: %w", err)
	}

	if err := op.Wait(ctx); err != nil {
		if strings.Contains(strings.ToLower(err.Error()), "pretrained") {
			fmt.Fprintf(w, "Processor version is pretrained by Google and cannot be deleted: %s\n", name)
			return nil
		}
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Processor version deleted: %s\n", name)

	return nil
}

// [END documentai_v1_documentprocessorservice_processorversion_delete]
