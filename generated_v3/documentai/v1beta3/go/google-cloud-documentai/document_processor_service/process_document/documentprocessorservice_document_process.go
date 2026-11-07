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

// [START documentai_v1beta3_documentprocessorservice_process_document]

import (
	"context"
	"fmt"
	"io"

	documentai "cloud.google.com/go/documentai/apiv1beta3"
	"cloud.google.com/go/documentai/apiv1beta3/documentaipb"
	"google.golang.org/api/option"
)

// processDocument processes an inline document using Document AI.
func processDocument(ctx context.Context, w io.Writer, projectID string, locationID string, processorID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/processors/%s", projectID, locationID, processorID)

	// Minimal valid PDF document structure for inline processing.
	rawDocument := &documentaipb.RawDocument{
		Content: []byte("%PDF-1.4\n" +
			"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n" +
			"2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n" +
			"3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] >>\nendobj\n" +
			"xref\n0 4\n" +
			"0000000000 65535 f \n" +
			"0000000009 00000 n \n" +
			"0000000058 00000 n \n" +
			"0000000115 00000 n \n" +
			"trailer\n<< /Size 4 /Root 1 0 R >>\n" +
			"startxref\n186\n%%EOF\n"),
		MimeType: "application/pdf",
	}

	endpoint := fmt.Sprintf("%s-documentai.googleapis.com:443", locationID)
	client, err := documentai.NewDocumentProcessorClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewDocumentProcessorClient: %w", err)
	}
	defer client.Close()

	req := &documentaipb.ProcessRequest{
		Name: name,
		Source: &documentaipb.ProcessRequest_RawDocument{
			RawDocument: rawDocument,
		},
	}

	resp, err := client.ProcessDocument(ctx, req)
	if err != nil {
		return fmt.Errorf("ProcessDocument: %w", err)
	}

	fmt.Fprintf(w, "Document processed successfully. Document text: %q\n", resp.GetDocument().GetText())
	return nil
}

// [END documentai_v1beta3_documentprocessorservice_process_document]
