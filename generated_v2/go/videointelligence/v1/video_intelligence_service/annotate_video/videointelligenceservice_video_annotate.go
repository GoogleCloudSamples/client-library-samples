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

// [START videointelligence_v1_videointelligenceservice_annotate_video]

import (
	"context"
	"fmt"
	"io"
	"os"

	videointelligence "cloud.google.com/go/videointelligence/apiv1"
	videointelligencepb "cloud.google.com/go/videointelligence/apiv1/videointelligencepb"
	"google.golang.org/api/option"
)

// annotateVideo analyzes a video for label annotations.
func annotateVideo(ctx context.Context, w io.Writer) error {
	features := videointelligencepb.Feature_LABEL_DETECTION

	var opts []option.ClientOption
	if projectID := os.Getenv("GOOGLE_CLOUD_PROJECT"); projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	} else if projectID := os.Getenv("GCP_PROJECT"); projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	}

	client, err := videointelligence.NewClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("videointelligence.NewClient: %w", err)
	}
	defer client.Close()

	req := &videointelligencepb.AnnotateVideoRequest{
		InputUri: "gs://cloud-samples-data/video/cat.mp4",
		Features: []videointelligencepb.Feature{features},
	}

	op, err := client.AnnotateVideo(ctx, req)
	if err != nil {
		return fmt.Errorf("AnnotateVideo: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	for _, result := range resp.GetAnnotationResults() {
		for _, annotation := range result.GetSegmentLabelAnnotations() {
			fmt.Fprintf(w, "Label: %s\n", annotation.GetEntity().GetDescription())
		}
	}

	return nil
}

// [END videointelligence_v1_videointelligenceservice_annotate_video]
