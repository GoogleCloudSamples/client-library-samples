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

// [START webrisk_v1beta1_webriskservicev1beta1_compute_threat_list_diff]

import (
	"context"
	"fmt"
	"io"
	"os"

	webrisk "cloud.google.com/go/webrisk/apiv1beta1"
	webriskpb "cloud.google.com/go/webrisk/apiv1beta1/webriskpb"
	"google.golang.org/api/option"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// computeThreatListDiff gets diffs between the local threat list and the server list.
func computeThreatListDiff(ctx context.Context, w io.Writer) error {
	threatType := webriskpb.ThreatType_MALWARE
	constraints := &webriskpb.ComputeThreatListDiffRequest_Constraints{
		SupportedCompressions: []webriskpb.CompressionType{
			webriskpb.CompressionType_RAW,
		},
	}

	var opts []option.ClientOption
	if projectID := os.Getenv("GOOGLE_CLOUD_PROJECT"); projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	} else if projectID := os.Getenv("GCLOUD_PROJECT"); projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	}

	client, err := webrisk.NewWebRiskServiceV1Beta1Client(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewWebRiskServiceV1Beta1Client: %w", err)
	}
	defer client.Close()

	req := &webriskpb.ComputeThreatListDiffRequest{
		ThreatType:  threatType,
		Constraints: constraints,
	}

	resp, err := client.ComputeThreatListDiff(ctx, req)
	if err != nil {
		if s, ok := status.FromError(err); ok && s.Code() == codes.PermissionDenied {
			fmt.Fprintf(w, "ComputeThreatListDiff: %v\n", s.Message())
			return nil
		}
		return fmt.Errorf("ComputeThreatListDiff: %w", err)
	}

	fmt.Fprintf(w, "Response type: %v\n", resp.GetResponseType())
	fmt.Fprintf(w, "New version token: %x\n", resp.GetNewVersionToken())

	return nil
}

// [END webrisk_v1beta1_webriskservicev1beta1_compute_threat_list_diff]
